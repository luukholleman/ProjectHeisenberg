from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils.translation import ugettext_lazy as _
from authentication.models import User, UserColor


class Team(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=4096, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    creator = models.ForeignKey(User, related_name='group_creator_set')
    user_color = models.ManyToManyField(UserColor, blank=True)
    invitations = models.ManyToManyField(User, blank=True)

    def get_team_color(self, user):
        teams = Team.objects.filter(pk=self.pk, user_color__user_id=user.pk)

        # set default color
        color = '979797'

        if teams is None:
            return color

        try:
            user_color = UserColor.objects.filter(team__in=teams).get()
            color = user_color.color.color
        except ObjectDoesNotExist:
            return color

        return color

    @property
    def abbreviation(self):
        """
        Returns the abbreviation of the group (first letters of words, max. two words).
        """
        abbr = ""
        words = self.name.split()
        for word in words:
            abbr += word[0]
        return abbr[0:2].upper()