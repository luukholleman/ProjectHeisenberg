# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0004_auto_20141126_1536'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meetinginvitation',
            old_name='user_state',
            new_name='state',
        ),
    ]
