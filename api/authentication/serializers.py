from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.serializers import AuthTokenSerializer as BaseAuthTokenSerializer
from api.team.serializers import TeamSerializer
from authentication.models import User
from django.utils.translation import ugettext_lazy as _


class UserSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(source='team_set', read_only=False, many=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'full_name', 'initials', 'teams')
        write_only_fields = ('password',)


class AuthTokenSerializer(BaseAuthTokenSerializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(username=email, password=password)

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
