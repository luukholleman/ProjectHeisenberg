from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.generics import RetrieveAPIView

from authentication.models import User
from base.rest.permissions import AuthenticatedOrAnonReadAndCreate, IsSelf
from authentication.serializers import UserSerializer


@permission_classes((AuthenticatedOrAnonReadAndCreate,IsSelf,))
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@permission_classes((IsSelf,))
class AuthenticatedUser(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self, queryset=None):
        return self.request.user
