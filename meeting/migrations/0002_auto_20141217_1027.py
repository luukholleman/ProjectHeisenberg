# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import meeting.models


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agenda',
            name='file',
            field=models.FileField(upload_to=meeting.models.get_file_path),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='attachment',
            name='file',
            field=models.FileField(upload_to=meeting.models.get_file_path),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='minute',
            name='file',
            field=models.FileField(upload_to=meeting.models.get_file_path),
            preserve_default=True,
        ),
    ]
