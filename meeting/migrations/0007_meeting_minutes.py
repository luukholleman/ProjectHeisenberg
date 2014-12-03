# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_minute'),
        ('meeting', '0006_meeting_agendas'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='minutes',
            field=models.ManyToManyField(to='base.Minute'),
            preserve_default=True,
        ),
    ]
