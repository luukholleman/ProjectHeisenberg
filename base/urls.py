from django.conf.urls import patterns, include, url
from base.views import HomepageTemplateView, RedirectToHomeView

urlpatterns = patterns('',
    url(r'^$', HomepageTemplateView.as_view(), name='home'),
    url(r'api/(.?)', 'base.views.not_found', name='not_found'),
    url(r'(.?)$', HomepageTemplateView.as_view(), name='redirect_to_home')
)