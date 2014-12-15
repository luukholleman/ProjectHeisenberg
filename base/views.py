from django.http.response import HttpResponseNotFound
from django.views.generic.base import TemplateView, RedirectView


class HomepageTemplateView(TemplateView):
    template_name = 'base/home.html'


class RedirectToHomeView(RedirectView):
    url = '/'


def not_found(request, url):
    return HttpResponseNotFound("404")
