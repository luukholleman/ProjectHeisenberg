# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0007_auto_20141204_1001'),
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Agenda',
        ),
        migrations.DeleteModel(
            name='Attachment',
        ),
        migrations.DeleteModel(
            name='Minute',
        ),
    ]
