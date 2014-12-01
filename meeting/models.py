from django.db import models
from authentication.models import User


class Meeting(models.Model):
    creator = models.ForeignKey(User, null=True, related_name='creator_user')
    name = models.CharField(max_length=90)
    description = models.TextField(null=True)
    location = models.CharField(null=True, max_length=90)
    address = models.CharField(null=True, max_length=200)
    date_and_time = models.DateTimeField()

    def __str__(self):
        return self.name


class MeetingInvitation(models.Model):
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
    meeting = models.ForeignKey(to='Meeting')
    user = models.ForeignKey(User)
    state = models.IntegerField(max_length=1, default=UNKNOWN, choices=CHOICES)
    present_at = models.DateTimeField(null=True)


