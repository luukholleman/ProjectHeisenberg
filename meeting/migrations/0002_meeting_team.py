# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0002_remove_team_meetings'),
        ('meeting', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='team',
            field=models.ForeignKey(default=1, to='team.Team'),
            preserve_default=False,
        ),
    ]
