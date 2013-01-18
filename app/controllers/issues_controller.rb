class IssuesController < ApplicationController
  respond_to :json
  
  def main
  end
  
  def index
    @issues = Issue.all
    respond_with @issues
  end
  
  def show
    @issue = Issue.find(params[:id])
    respond_with @issue
  end
  
  def create
    @issue = Issue.create(params[:issue])
    respond_with @issue
  end
  
  def update
    @issue = Issue.update(params[:id], params[:issue])
    respond_with @issue
  end
  
  def destroy
    @issue = Issue.destroy(params[:id])
    respond_with @issue
  end
end
