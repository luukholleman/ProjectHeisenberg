from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from authentication.models import UserColor
from team.models import Team


class TeamSerializer(serializers.ModelSerializer):

    def to_representation(self, team):
        data = super(TeamSerializer, self).to_representation(team)
        request = self.context['request']
        data['color'] = team.get_team_color(request.user)
        return data

    class Meta:
        model = Team
        fields = ('id', 'name', 'description', 'created_at', 'creator', 'abbreviation')
