from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email_address', 'first_name', 'last_name', 'password',)
        write_only_fields = ('password',)
