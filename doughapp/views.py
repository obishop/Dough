from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required

from dough.doughapp import models

import time, calendar

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
    purchases = models.Purchase.objects.filter(user=request.user).order_by('-date')
    
    nyear, nmonth, nday = time.localtime()[:3]

    # Format data for spending graph
    cur_month = nmonth #begin with the current month
    plot_data = "["
    plot_xticks = "["
    purchase_index = 0
    for i in range(12,0,-1):
        spent = 0
        while purchase_index<len(purchases) and purchases[purchase_index].date.month == cur_month:
            spent = spent + purchases[purchase_index].amount
            purchase_index += 1
            if purchase_index >= len(purchases):
                break
        if cur_month == nmonth:
            spent_this_month = spent
        plot_data = plot_data+"["+str(i)+","+str(spent)+"],"
        plot_xticks = plot_xticks+"["+str(i)+",\""+calendar.month_abbr[cur_month]+"\"],"
        #if purchase_index >= len(purchases):
        #    break
        cur_month = cur_month - 1
        if cur_month == 0:
            cur_month = 12
    plot_data = plot_data[:-1]+"]"
    plot_xticks = plot_xticks[:-1]+"]"

    args['plot_data'] = plot_data
    args['plot_xticks'] = plot_xticks
    args['purchases'] = purchases
    args['spent_this_month'] = spent_this_month
    args['monthly_budget'] = request.user.profile.monthly_budget
    return render_to_response('budget.html',args)

@login_required
def recipes(request):
    return render_to_response('recipes.html')
