from django.conf.urls import patterns, include, url
from base.views import HomepageTemplateView

urlpatterns = patterns('',
    url(r'^$', HomepageTemplateView.as_view(), name='home'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #url(r'.*', HomepageTemplateView.as_view(), name='home')
)