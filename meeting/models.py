import hashlib
import os
import uuid
from django.db import models
from authentication.models import User
from team.models import Team


def get_file_path(instance, filename):
    return '/'.join(['meeting', instance.FILE_TYPE, hashlib.sha1(str(uuid.uuid4())).hexdigest()])


class MeetingFile(models.Model):
    uploaded_at = models.DateTimeField(auto_now=True)
    file_name = models.CharField(max_length=200, null=True)
    created_by = models.ForeignKey(User, null=True)

    def has_access(self, user):
        """ Check if the user has access to this file """

        #TODO: add group checks
        return True

    def get_extension(self):
        name, extension = os.path.splitext(self.file.name)
        return extension

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        file_name, file_extension = os.path.splitext(self.file.name)

        # Only update when we're creating
        if self.pk is None:
            self.file_name = file_name
        super(MeetingFile, self).save()

    class Meta:
        abstract = True


class Agenda(MeetingFile):
    FILE_TYPE = 'agenda'
    file = models.FileField(upload_to=get_file_path)


class Minute(MeetingFile):
    FILE_TYPE = 'minute'
    file = models.FileField(upload_to=get_file_path)


class Attachment(MeetingFile):
    FILE_TYPE = 'attachment'
    file = models.FileField(upload_to=get_file_path)


class Meeting(models.Model):
    creator = models.ForeignKey(User, null=True, related_name='creator_user')
    team = models.ForeignKey(Team)
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

