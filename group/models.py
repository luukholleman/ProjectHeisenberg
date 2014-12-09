from django.db import models
from django.utils.translation import ugettext_lazy as _
from authentication.models import User, UserColor
from meeting.models import Meeting

class Group(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=4096, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    creator = models.ForeignKey(User, related_name='group_creator_set')
    user_color = models.ManyToManyField(UserColor, blank=True)
    invitations = models.ManyToManyField(User, blank=True)
    meetings = models.ManyToManyField(Meeting, blank=True)

    @property
    def abbreviation(self):
        """
        :return: Abbreviation of group (first letters of words, max. two words)
        """
        words = self.name.split()
        abbr = words[0][0] + words[1][0]
        return abbr.upper()