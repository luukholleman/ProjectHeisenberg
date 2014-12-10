# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0008_auto_20141210_1207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agenda',
            name='file_name',
            field=models.CharField(max_length=200, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='attachment',
            name='file_name',
            field=models.CharField(max_length=200, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='minute',
            name='file_name',
            field=models.CharField(max_length=200, null=True),
            preserve_default=True,
        ),
    ]
