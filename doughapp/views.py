from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required

from dough.doughapp import models

@login_required
def index(request):
    args = {}
    args['username'] = request.user.username
    return render_to_response('index.html',args)

@login_required
def food(request):
    return render_to_response('food.html')

@login_required
def budget(request):
    args = {}
    args['purchases'] = models.Purchase.objects.filter(user=request.user).order_by('-date')
    args['monthly_budget'] = request.user.profile.monthly_budget
    return render_to_response('budget.html',args)

@login_required
def recipes(request):
    return render_to_response('recipes.html')
