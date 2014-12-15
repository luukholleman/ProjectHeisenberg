# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meeting', '0009_auto_20141210_1211'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agenda',
            old_name='upload_at',
            new_name='uploaded_at',
        ),
        migrations.RenameField(
            model_name='attachment',
            old_name='upload_at',
            new_name='uploaded_at',
        ),
        migrations.RenameField(
            model_name='minute',
            old_name='upload_at',
            new_name='uploaded_at',
        ),
        migrations.AddField(
            model_name='agenda',
            name='created_by',
            field=models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='attachment',
            name='created_by',
            field=models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='minute',
            name='created_by',
            field=models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
