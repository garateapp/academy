<?php

namespace App\Mail;

use App\Modules\Survey\Domain\Survey;
use App\Modules\Survey\Domain\SurveyAssignment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SurveyInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Survey $survey,
        public readonly SurveyAssignment $assignment
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invitacion a encuesta: ' . $this->survey->title
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.surveys.invitation',
            with: [
                'survey' => $this->survey,
                'assignment' => $this->assignment,
                'url' => route('surveys.invite', $this->assignment->token),
            ]
        );
    }
}
