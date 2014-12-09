# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import datetime

from django.db import models, migrations


def seed_admin(apps, schema_editor):
    # create user, password is: admin
    User = apps.get_model('authentication', 'User')
    user = User.objects.get_or_create(pk=1,
                               email='admin@punktli.ch',
                               first_name='Punktlich',
                               last_name='administrator',
                               is_staff=1,
                               is_active=1)

    user.set_password('admin')
    user.save()


class Migration(migrations.Migration):
    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_admin),
    ]
