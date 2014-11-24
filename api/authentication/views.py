import hashlib
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.template import Context
from django.template.loader import get_template
from django.utils.text import slugify
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken as BaseObtainAuthToken
from rest_framework.generics import RetrieveAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ProjectHeisenberg.settings import SITE_URL
from rest_framework.decorators import permission_classes

from authentication.models import User
from base.rest.permissions import AuthenticatedOrAnonReadAndCreate, IsSelf
from api.authentication.serializers import UserSerializer, AuthTokenSerializer


@permission_classes((AuthenticatedOrAnonReadAndCreate, IsSelf,))
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def pre_save(self, obj):
        obj.username = slugify(obj.first_name + ' ' + obj.last_name)

    def post_save(self, user, created=False):
        if created:
            user.set_password(user.password)
            user.set_activation(expire_days=7)

            send_mail(subject="Welcome to Punktlich",
                      html_message=get_template('base/emails/activate.html').render(Context({'site_url': SITE_URL, 'user': user})),
                      recipient_list=[user.email],
                      from_email=None,
                      message=None)

            user.save()

@permission_classes((IsSelf,))
class AuthenticatedUser(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self, queryset=None):
        return self.request.user


class ObtainAuthToken(BaseObtainAuthToken):
    serializer_class = AuthTokenSerializer

    def post(self, request):
        # @todo username niet verplicht maken, dit is te lelijk
        request.DATA[u'username'] = 'todo'

        return super(ObtainAuthToken, self).post(request)


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
