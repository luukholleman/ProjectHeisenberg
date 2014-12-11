from django.conf.urls import patterns, include, url
from meeting.views import DownloadMeetingFileView

urlpatterns = patterns('',
                       url(r'files/(?P<type>\w+)/(?P<pk>\d+)$', DownloadMeetingFileView.as_view(),
                           name='download_file'),
)
