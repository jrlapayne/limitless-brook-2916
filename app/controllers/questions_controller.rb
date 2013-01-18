class QuestionsController < ApplicationController
  respond_to :json
  
  def index
    @questions = Question.all
    respond_with @questions
  end
  
  def show
    @question = Question.find(params[:id])
    respond_with @question
  end
  
  def create
    @question = Question.create(params[:question])
    respond_with @question
  end
  
  def update
    @question = Question.update(params[:id], params[:question])
    respond_with @question
  end
  
  def destroy
    @question = Question.destroy(params[:id])
    respond_with @question
  end
end
