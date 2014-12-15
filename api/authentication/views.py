import hashlib
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.template import Context
from django.template.loader import get_template
from django.utils.text import slugify
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken as BaseObtainAuthToken
from rest_framework.generics import RetrieveAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ProjectHeisenberg.settings import SITE_URL
from rest_framework.decorators import permission_classes, detail_route
from api.team.serializers import TeamSerializer

from authentication.models import User
from base.rest.permissions import AuthenticatedOrAnonReadAndCreate, IsSelf
from api.authentication.serializers import UserSerializer, AuthTokenSerializer


@permission_classes((AuthenticatedOrAnonReadAndCreate, IsSelf,))
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        instance = serializer.save()

        send_mail(subject="Welcome to Punktlich",
                  html_message=get_template('base/emails/activate.html').render(
                      Context({'site_url': SITE_URL, 'user': instance})),
                  recipient_list=[instance.email],
                  from_email=None,
                  message=None)

    @detail_route(methods=['GET'])
    def teams(self, request, pk=None):
        return Response(TeamSerializer(request.user.team_set.all(), many=True).data)


@permission_classes((IsSelf,))
class AuthenticatedUser(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self, queryset=None):
        return self.request.user

    @detail_route(methods=['GET'])
    def teams(self, request, pk=None):
        return Response(TeamSerializer(request.user.team_set.get()).data)

    @detail_route(methods=['DELETE'])
    def teams(self, request, pk=None):
        return Response(TeamSerializer(request.user.team_set.get()).data)


class ObtainAuthToken(BaseObtainAuthToken):
    serializer_class = AuthTokenSerializer

    def post(self, request):
        request.DATA[u'username'] = 'todo'
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key})


obtain_auth_token = ObtainAuthToken.as_view()


class ActivateUser(APIView):
    permission_classes = []

    def post(self, request):
        queryset = User.objects.filter(activation_token=request.DATA['activation_token'])

        # try to find the user or throw a 404
        user = get_object_or_404(queryset)

        # activate the user
        user.activate()

        return Response({'success': 'User successfully activated'})
