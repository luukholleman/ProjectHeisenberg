# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import meeting.validators


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0007_auto_20141204_1001'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agenda',
            name='file',
            field=models.FileField(upload_to=b'agendas'),
            preserve_default=True,
        ),
    ]
