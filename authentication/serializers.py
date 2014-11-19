from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.serializers import AuthTokenSerializer as BaseAuthTokenSerializer
from authentication.models import User
from django.utils.translation import ugettext_lazy as _


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email_address', 'first_name', 'last_name', 'password',)
        write_only_fields = ('password',)


class AuthTokenSerializer(BaseAuthTokenSerializer):
    username = None
    email_address = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        email_address = attrs.get('email_address')
        password = attrs.get('password')

        if email_address and password:
            user = authenticate(username=email_address, password=password)

            if user:
                if not user.is_active:
                    msg = _('User account is disabled.')
                    raise serializers.ValidationError(msg)
                attrs['user'] = user
                return attrs
            else:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg)
        else:
            msg = _('Must include "username" and "password"')
            raise serializers.ValidationError(msg)
