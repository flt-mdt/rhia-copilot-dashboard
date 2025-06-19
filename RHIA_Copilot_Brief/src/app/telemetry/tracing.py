from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.httpx import HTTPXClientInstrumentor
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
    ConsoleSpanExporter,
)
from opentelemetry.sdk.trace.export import OTLPSpanExporter


def setup_tracer(app, service_name="rhia-api"):
    resource = Resource(attributes={SERVICE_NAME: service_name})
    provider = TracerProvider(resource=resource)
    trace.set_tracer_provider(provider)

    # Export vers console ou OTLP (pour Grafana Tempo, Datadog, etc.)
    span_processor = BatchSpanProcessor(ConsoleSpanExporter())
    provider.add_span_processor(span_processor)

    # ➕ Ajout d’un exporteur OTLP si besoin
    # otlp_exporter = OTLPSpanExporter(endpoint="http://otel-collector:4317", insecure=True)
    # provider.add_span_processor(BatchSpanProcessor(otlp_exporter))

    FastAPIInstrumentor.instrument_app(app)
    HTTPXClientInstrumentor().instrument()

