from rest_framework import viewsets
from rest_framework.decorators import permission_classes

from authentication.models import User
from base.rest.permissions import AuthenticatedOrAnonReadAndCreate, IsSelf
from authentication.serializers import UserSerializer


@permission_classes((AuthenticatedOrAnonReadAndCreate,IsSelf))
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer