# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
        ('meeting', '0005_auto_20141126_1616'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='agendas',
            field=models.ManyToManyField(to='base.Agenda'),
            preserve_default=True,
        ),
    ]
