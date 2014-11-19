from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

class User(AbstractUser):
    email_address = models.EmailField(_('email address'), blank=True, unique=True)

    USERNAME_FIELD = 'email_address'
