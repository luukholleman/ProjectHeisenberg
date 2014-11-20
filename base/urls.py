from django.conf.urls import patterns, include, url
from base.views import HomepageTemplateView

urlpatterns = patterns('',
    url(r'^$', HomepageTemplateView.as_view(), name='home'),
)