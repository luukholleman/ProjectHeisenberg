# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0007_auto_20141204_1001'),
    ]

    operations = [
        migrations.AddField(
            model_name='agenda',
            name='file_name',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='attachment',
            name='file_name',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='minute',
            name='file_name',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
    ]
