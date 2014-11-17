from django.conf.urls import patterns, include, url
from django.contrib.auth.models import User
from base.views import HomepageTemplateView
router = routers.DefaultRouter()

urlpatterns = patterns('',
    url(r'^$', HomepageTemplateView.as_view(), name='home'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)