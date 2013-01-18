class ChallengesController < ApplicationController
  respond_to :json
  
  def index
    @challenges = Challenge.all
    respond_with @challenges
  end
  
  def show
    @challenge = Challenge.find(params[:id])
    respond_with @challenge
  end
  
  def create
    @challenge = Challenge.create(params[:challenge])
    respond_with @challenge
  end
  
  def update
    @challenge = Challenge.update(params[:id], params[:challenge])
    respond_with @challenge
  end
  
  def destroy
    @challenge = Challenge.destroy(params[:id])
    respond_with @challenge
  end
end
