from django.db import models


class File(models.Model):
    upload_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.filename


class Agenda(File):
    file = models.FileField(upload_to='agendas')
    

class Minute(File):
    file = models.FileField(upload_to='minutes')


class Attachment(File):
    file = models.FileField(upload_to='attachments')
