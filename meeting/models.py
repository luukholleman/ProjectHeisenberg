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
    UNKNOWN = 0
    PRESENT = 1
    MAYBE = 2
    REJECT = 3

    CHOICES = (
        (UNKNOWN, 'Unknown'),
        (PRESENT, 'Present'),
        (MAYBE, 'Maybe'),
        (REJECT, 'Reject')
    )
    user = models.ForeignKey(User)
    meeting = models.ForeignKey(Meeting)
    user_state = models.IntegerField(max_length=1, default=UNKNOWN, choices=CHOICES)
    present_at = models.DateTimeField()

    def __str__(self):
        return self.user.first_name + ' ' + self.meeting.name
