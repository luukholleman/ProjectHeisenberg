from django.db import models
from authentication.models import User


class Meeting(models.Model):
    creator = models.ForeignKey(User, null=True, related_name='creator_user')
    name = models.CharField(max_length=90)
    description = models.TextField(null=True)
    location = models.CharField(null=True, max_length=90)
    address = models.CharField(null=True, max_length=200)
    participants = models.ManyToManyField(User, through='MeetingUser', related_name='participant_user')
    date_and_time = models.DateTimeField()

    def __str__(self):
        return self.name


class MeetingUser(models.Model):
    CHOICES = (
        (0, 'Unknown'),
        (1, 'Present'),
        (2, 'Maybe'),
        (3, 'Reject')
    )
    user = models.ForeignKey(User)
    meeting = models.ForeignKey(Meeting)
    user_state = models.CharField(max_length=20, default=False, choices=CHOICES)
    present_at = models.DateTimeField()

    def __str__(self):
        return self.user.first_name + ' ' + self.meeting.name
