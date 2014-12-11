from django.conf.urls import patterns, include, url
from base.views import HomepageTemplateView, DownloadMeetingFileView

urlpatterns = patterns('',
    url(r'files/(?P<type>\w+)/(?P<pk>\d+)$', DownloadMeetingFileView.as_view(), name='download_file'),
    url(r'^$', HomepageTemplateView.as_view(), name='home'),
    url(r'api/(.?)', 'base.views.not_found', name='not_found'),
    url(r'(.?)$', HomepageTemplateView.as_view(), name='redirect_to_home'),
)