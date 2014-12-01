# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0002_auto_20141126_1325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meetinguser',
            name='present_at',
            field=models.DateTimeField(null=True),
            preserve_default=True,
        ),
    ]
