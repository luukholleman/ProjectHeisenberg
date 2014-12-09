# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_color_usercolor'),
        ('group', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group',
            old_name='members',
            new_name='invitations',
        ),
        migrations.AddField(
            model_name='group',
            name='user_color',
            field=models.ManyToManyField(to='authentication.UserColor'),
            preserve_default=True,
        ),
    ]
