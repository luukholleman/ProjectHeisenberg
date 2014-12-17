from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from authentication.models import UserColor
from team.models import Team


class TeamSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        data = super(TeamSerializer, self).to_representation(instance)

        if 'request' not in self.context:
            return data

        request = self.context['request']
        teams = Team.objects.filter(pk=instance.pk, user_color__user_id=request.user.pk)

        # set default color
        data['color'] = '979797'

        if teams is None:
            return data

        try:
            user_color = UserColor.objects.filter(team__in=teams).get()
            data['color'] = user_color.color.color
        except ObjectDoesNotExist:
            return data

        return data

    class Meta:
        model = Team
        fields = ('id', 'name', 'description', 'created_at', 'creator', 'abbreviation')
