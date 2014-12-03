from django.db import models


class File(models.Model):
    filename = models.CharField(max_length=200)
    upload_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.filename


class Agenda(File):
    date = models.DateTimeField()


class Minute(File):
    test = models.CharField(max_length=20)