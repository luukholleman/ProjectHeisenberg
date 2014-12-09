# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0002_auto_20141209_1341'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='invitations',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='group',
            name='meetings',
            field=models.ManyToManyField(to='meeting.Meeting', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='group',
            name='user_color',
            field=models.ManyToManyField(to='authentication.UserColor', blank=True),
            preserve_default=True,
        ),
    ]
