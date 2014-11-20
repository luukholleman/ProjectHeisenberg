# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='activation_expire',
            field=models.DateField(default=None, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='user',
            name='activation_token',
            field=models.CharField(max_length=90, null=True),
            preserve_default=True,
        ),
    ]
