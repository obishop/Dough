from django.http import HttpResponse, HttpResponseServerError
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from dough.doughapp import models

@login_required
@csrf_exempt
def set_budget(request):
    if request.method != "POST":
        return HttpResponseServerError(u"No POST data sent.")
    post = request.POST.copy()
    if not post.has_key('budget'):
        return HttpResponseServerError(u"Insufficient POST data (need 'budget')")
    
    profile = request.user.profile
    profile.monthly_budget = post['budget']
    profile.save()

    return HttpResponse("Success")

