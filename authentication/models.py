from datetime import timedelta, datetime
import hashlib
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone as tz
from django.utils.translation import ugettext_lazy as _
from authentication.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), blank=False, null=False, unique=True)

    USERNAME_FIELD = 'email'

    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    Username, password and email are required. Other fields are optional.
    """
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    is_staff = models.BooleanField(_('staff status'), default=False,
                                   help_text=_('Designates whether the user can log into this admin '
                                               'site.'))
    is_active = models.BooleanField(_('active'), default=True,
                                    help_text=_('Designates whether this user should be treated as '
                                                'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=tz.now)

    activation_token = models.CharField(max_length=90, null=True)
    activation_expire = models.DateField(null=True, default=None)

    objects = UserManager()

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        "Returns the short name for the user."
        return self.first_name

    def activate(self):
        self.activation_expire = None
        self.activation_token = None
        self.is_active = True
        return self.save()

    def set_activation(self, expire_days):
        time_span = timedelta(days=expire_days)
        self.activation_token = hashlib.sha1(self.email).hexdigest()
        self.activation_expire = datetime.now() + time_span
