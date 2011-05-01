from django.http import HttpResponse, HttpResponseServerError
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from dough.doughapp import models

import json

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

@login_required
@csrf_exempt
def edit_purchase(request, id):
    if request.method != "POST":
        return HttpResponseServerError(u"No POST data sent.")
    post = request.POST.copy()
    if not post.has_key('amount'):
        return HttpResponseServerError(u"Insufficient POST data (need 'amount')")

    purchase = models.Purchase.objects.get(id=id)
    purchase.amount = post['amount']
    purchase.save()

    return HttpResponse("Success")

@login_required
@csrf_exempt
def add_food_items(request):
    if request.method != "POST":
        return HttpResponseServerError(u"No POST data sent.")
    post = request.POST.copy()
    if not (post.has_key('food_items') and post.has_key('purchase_amount') and post.has_key('purchase_date')):
        return HttpResponseServerError(u"Need json encoded 'food_items', along with 'purchase_amount' and 'purchase_date'")
 
    purchase = models.Purchase(amount=post['purchase_amount'],
                               date=post['purchase_date'],
                               user=request.user)
    purchase.save()
    newFoodItemProps = json.loads(post['food_items'])
    for props in newFoodItemProps:
        newFoodItem = models.FoodItem(name=props['name'],
                                      expiration=props['expiration'],
                                      location=props['location'],
                                      category=props['category'],
                                      purchase=purchase,
                                      user=request.user)
        newFoodItem.save()

    return HttpResponse("Success")
