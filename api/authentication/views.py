from django.utils.text import slugify
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken as BaseObtainAuthToken
from rest_framework.decorators import permission_classes
from rest_framework.generics import RetrieveAPIView

from authentication.models import User
from base.rest.permissions import AuthenticatedOrAnonReadAndCreate, IsSelf
from api.authentication.serializers import UserSerializer, AuthTokenSerializer


@permission_classes((AuthenticatedOrAnonReadAndCreate,IsSelf,))
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def pre_save(self, obj):
        obj.username = slugify(obj.first_name + ' ' + obj.last_name)

    def post_save(self, obj, created=False):
        if created:
            obj.set_password(obj.password)

            obj.save()


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
