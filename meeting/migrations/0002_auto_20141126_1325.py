# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meetinguser',
            name='user_state',
            field=models.IntegerField(default=0, max_length=1, choices=[(0, b'Unknown'), (1, b'Present'), (2, b'Maybe'), (3, b'Reject')]),
            preserve_default=True,
        ),
    ]
