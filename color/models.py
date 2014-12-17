from django.db import models


class Color(models.Model):
    color = models.CharField(max_length=6, blank=True)