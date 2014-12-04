import hashlib
import uuid
from django.db import models
from authentication.models import User


class File(models.Model):
    upload_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.filename


class Agenda(File):
    file = models.FileField(upload_to='agendas')

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        self.file.name = hashlib.sha1(str(uuid.uuid4())).hexdigest() + '.pdf'
        super(Agenda, self).save()


class Minute(File):
    file = models.FileField(upload_to='minutes')


class Attachment(File):
    file = models.FileField(upload_to='attachments')


class Meeting(models.Model):
    creator = models.ForeignKey(User, null=True, related_name='creator_user')
    name = models.CharField(max_length=90)
    description = models.TextField(null=True)
    location = models.CharField(null=True, max_length=90)
    address = models.CharField(null=True, max_length=200)
    date_and_time = models.DateTimeField()
    agendas = models.ManyToManyField(Agenda)
    minutes = models.ManyToManyField(Minute)

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

